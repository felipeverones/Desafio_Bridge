package com.example.nprimos;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(PrimeController.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class PrimeControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testHealthCheck() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("OK"))
                .andExpect(jsonPath("$.message").value("Servidor Backend rodando!"))
                .andExpect(jsonPath("$.data").isEmpty());
    }

    @Test
    public void testPrimeCount() throws Exception {
        mockMvc.perform(get("/primes?k=10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.upperLimit").value(10))
                .andExpect(jsonPath("$.data.countPrimes").value(4))
                .andExpect(jsonPath("$.data.message").value("Números primos menores que 10: 4."))
                .andExpect(jsonPath("$.message").value("Consulta realizada com sucesso!"));
    }

    @Test
    public void testNonNumericInput() throws Exception {
        mockMvc.perform(get("/primes?k=abc"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Erro de Tipo"))
                .andExpect(jsonPath("$.data").value("Erro de tipo: Esperava-se um número inteiro. Por favor, verifique o valor informado e tente novamente com um número válido."));
    }

    @Test
    public void testHighLoadPerformance() throws Exception {
        mockMvc.perform(get("/primes?k=999999"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.countPrimes").isNumber())
                .andExpect(jsonPath("$.message").value("Consulta realizada com sucesso!"));
    }

    @Test
    public void testForceErrorEndpoint() throws Exception {
        mockMvc.perform(get("/force-error"))
                .andExpect(status().isInternalServerError()) // Verifica se o status é 500
                .andExpect(jsonPath("$.message").value("Erro Interno do Servidor"))
                .andExpect(jsonPath("$.data").value("Ocorreu um erro inesperado: Erro forçado para teste"));
    }

    @Test
    public void testPrimeCountBelowMinimum() throws Exception {
        mockMvc.perform(get("/primes?k=1"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Erro de Validação"))
                .andExpect(jsonPath("$.data").value("O número informado deve ser maior ou igual a 2."));
    }

    @Test
    public void testPrimeCountAboveMaximum() throws Exception {
        mockMvc.perform(get("/primes?k=1000001"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Erro de Validação"))
                .andExpect(jsonPath("$.data").value("O número informado deve ser menor ou igual a 1000000."));
    }


    @Test
    public void testHistoryConsistency() throws Exception {
        mockMvc.perform(get("/primes?k=10")).andReturn(); // primeiro input k=10
        mockMvc.perform(get("/primes?k=10")).andReturn(); // segundo input com k=10 de novo
        mockMvc.perform(get("/primes?k=20")).andReturn(); // terceiro input com k=20
        mockMvc.perform(get("/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(2)))
                .andExpect(jsonPath("$.message").value("Histórico recuperado com sucesso!"))
                .andExpect(jsonPath("$.data[0].message").value("Números primos menores que 10: 4."))
                .andExpect(jsonPath("$.data[1].message").value("Números primos menores que 20: 8."));
    }

    @Test
    public void testClearHistory() throws Exception {
        // adiciona valores ao histórico primeiro
        mockMvc.perform(get("/primes?k=10"))
                .andExpect(status().isOk());
        // verifica se o histórico não está vazio
        mockMvc.perform(get("/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(greaterThan(0))));
        // limpa o histórico
        mockMvc.perform(delete("/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("OK"))
                .andExpect(jsonPath("$.message").value("Histórico limpo com sucesso!"))
                .andExpect(jsonPath("$.data").isEmpty());
        //verifica se está limpo mesmo
        mockMvc.perform(get("/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(0)));
    }


}
