package com.example.nprimos;

public class PrimeResponse {
    private final int upperLimit;
    private final int countPrimes;
    private final String message;
    private final long calculationTimeMs;

    public PrimeResponse(int upperLimit, int countPrimes,  String message, long calculationTimeMs) {
        this.upperLimit = upperLimit;
        this.countPrimes = countPrimes;
        this.message = message;
        this.calculationTimeMs = calculationTimeMs;
    }

    public int getCountPrimes() {
        return countPrimes;
    }

    public int getUpperLimit() {
        return upperLimit;
    }

    public String getMessage() {
        return message;
    }

    public long getCalculationTimeMs() {
        return calculationTimeMs;
    }

    @Override
    public boolean equals(Object o){
        if (this == o){
            return true;
        }
        if (o == null || getClass() !=o.getClass()){
            return false;
        }
        PrimeResponse resposta = (PrimeResponse) o;
        return upperLimit == resposta.upperLimit && countPrimes == resposta.countPrimes;
    }

    @Override
    public int hashCode(){
        int result = Integer.hashCode(upperLimit);
        result = 31 * result + Integer.hashCode(countPrimes);
        return result;
    }
}
