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

@RestController
@Validated // pra habilitar validação
public class PrimeController {

    private final Set<String> history = new LinkedHashSet<>();

    @GetMapping("/primes")
    public ResponseEntity<String> countPrimes(@RequestParam @Min(value=2, message = "O número informado deve ser maior ou igual a 2.") @Max( value = 1000000, message = "O número informado deve ser menor ou igual a 1000000.") int k) {
        long startTime = System.currentTimeMillis();
        int primeCount = countPrimesLessThan(k);
        long endTime = System.currentTimeMillis();
        String result = "Números primos menores que " + k + ": " + primeCount + ".";
        String performance = " Calculado em " + (endTime - startTime) + "ms";
        history.add(result); // armazenando apenas o resultado, sem a performance.
        return ResponseEntity.ok(result + performance);
    }

    @GetMapping("/history")
    public ResponseEntity<Set<String>> getHistory(){
        return ResponseEntity.ok(history);
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
    public ResponseEntity<String> handleValidationExceptions( ConstraintViolationException ex, WebRequest request){
        StringBuilder message = new StringBuilder("Erro de validação: ");
        ex.getConstraintViolations().forEach(violation ->{
            message.append(violation.getMessage());
        });
        return ResponseEntity.badRequest().body(message.toString());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> handleTypeMismatch(MethodArgumentTypeMismatchException ex, WebRequest request){
        if(ex.getRequiredType() != null && ex.getRequiredType().equals(int.class)){
            return ResponseEntity.badRequest().body("Erro de tipo: Esperava-se um número inteiro. Por favor, verifique o valor informado e tente novamente com um número válido.");
        }
        return ResponseEntity.badRequest().body("Erro de tipo: O formato do valor informado é inválido. Esperava-se um valor do tipo " + (ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "desconhecido") + ".");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex, WebRequest request){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro inesperado: " + ex.getMessage());
    }

    @GetMapping("/force-error")
    public ResponseEntity<String> forceError(){
        throw new RuntimeException("Erro forçado para teste");
    }
}


