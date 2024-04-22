package com.example.nprimos;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@Validated // pra habilitar validação
public class PrimeController {

    private final Set<PrimeResponse> history = new LinkedHashSet<>();

    @GetMapping("/")
    public ResponseEntity<ApiResponse<String>> healthCheck(){
        ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Servidor Backend rodando!", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/primes")
    public ResponseEntity<ApiResponse<PrimeResponse>> countPrimes(@RequestParam @Min(value=2, message = "O número informado deve ser maior ou igual a 2.") @Max( value = 1000000, message = "O número informado deve ser menor ou igual a 1000000.") int k) {
        long startTime = System.currentTimeMillis();
        int primeCount = countPrimesLessThan(k);
        long endTime = System.currentTimeMillis();
        PrimeResponse response = new PrimeResponse(k, primeCount, "Números primos menores que " + k + ": " + primeCount + ".", endTime - startTime);
        history.add(response); // armazenando apenas o resultado, sem a performance.
        ApiResponse<PrimeResponse> apiResponse = new ApiResponse<>(HttpStatus.OK, "Consulta realizada com sucesso!", response);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<Set<PrimeResponse>>> getHistory(){
        ApiResponse<Set<PrimeResponse>> apiResponse = new ApiResponse<>(HttpStatus.OK, "Histórico recuperado com sucesso!", history);
        return ResponseEntity.ok(apiResponse);
    }

    private int countPrimesLessThan(int k) {
        int count = 0;
        for (int i = 2; i < k; i++) {
            if (isPrime(i)) {
                count++;
            }
        }
        return count;
    }

    private boolean isPrime(int number) {
        if (number <= 1) return false;
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) return false;
        }
        return true;
    }


    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationExceptions( ConstraintViolationException ex){
        String message = ex.getConstraintViolations().stream()
                        .map(violation -> violation.getMessage())
                        .collect(Collectors.joining(", "));
        ApiResponse<Object> errorResponse = new ApiResponse<>(HttpStatus.BAD_REQUEST, "Erro de Validação", message);
        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Object>> handleTypeMismatch(MethodArgumentTypeMismatchException ex){
        String message = "Erro de tipo: Esperava-se um número inteiro. Por favor, verifique o valor informado e tente novamente com um número válido.";
        ApiResponse<Object> errorResponse = new ApiResponse<>(HttpStatus.BAD_REQUEST, "Erro de Tipo", message);

        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleAllExceptions(Exception ex){
        ApiResponse<Object> errorResponse = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Erro Interno do Servidor", "Ocorreu um erro inesperado: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    @GetMapping("/force-error")
    public ResponseEntity<Object> forceError() {
        throw new RuntimeException("Erro forçado para teste");
    }
}


