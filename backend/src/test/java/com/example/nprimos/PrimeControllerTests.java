package com.example.nprimos;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.matchesPattern;
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
    public void testPrimeCount() throws Exception {
        mockMvc.perform(get("/primes?k=10"))
                .andExpect(status().isOk())
                .andExpect(content().string(matchesPattern("Números primos menores que 10: 4. Calculado em \\d+ms")));

    }

    @Test
    public void testNonNumericInput() throws Exception {
        mockMvc.perform(get("/primes?k=abc"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Erro de tipo: Esperava-se um número inteiro. Por favor, verifique o valor informado e tente novamente com um número válido.")));
    }

    @Test
    public void testHighLoadPerformance() throws Exception {
        mockMvc.perform(get("/primes?k=999999"))
                .andExpect(status().isOk())
                .andExpect(content().string(matchesPattern("Números primos menores que 999999: \\d+. Calculado em \\d+ms")));
    }

    @Test
    public void testForceErrorEndpoint() throws Exception {
        mockMvc.perform(get("/force-error"))
                .andExpect(status().isInternalServerError()) // Verifica se o status é 500
                .andExpect(content().string(containsString("Ocorreu um erro inesperado: Erro forçado para teste"))); // Verifica a mensagem de erro
    }

    @Test
    public void testPrimeCountBelowMinimum() throws Exception {
        mockMvc.perform(get("/primes?k=1"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("O número informado deve ser maior ou igual a 2.")));
    }

    @Test
    public void testPrimeCountAboveMaximum() throws Exception {
        mockMvc.perform(get("/primes?k=1000001"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("O número informado deve ser menor ou igual a 1000000.")));
    }


    @Test
    public void testHistoryConsistency() throws Exception {
        mockMvc.perform(get("/primes?k=10")).andReturn(); // primeiro input k=10
        mockMvc.perform(get("/primes?k=10")).andReturn(); // segundo input com k=10 de novo
        mockMvc.perform(get("/primes?k=20")).andReturn(); // terceiro input com k=20
        mockMvc.perform(get("/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2)) // precisa ser 2 pela prevenção de duplicatas
                .andExpect(jsonPath("$[0]", containsString("Números primos menores que 10: 4.")))
                .andExpect(jsonPath("$[1]", containsString("Números primos menores que 20: 8.")));
    }


}
