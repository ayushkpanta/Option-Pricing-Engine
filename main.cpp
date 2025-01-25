
#include <iostream>
#include "models.h"

/**
 * @brief Entry point for the options pricing engine. Currently only hosts an example for pricing using the Black-Scholes model.
 */
int main() {

    // Initialize models
    std::cout << "\n";
    BlackScholesModel black_scholes;
    BinomialModel binomial;
    std::cout << "\n";

    // Test parameters for Black-Scholes
    double S = 100.0;
    double X = 95.0;
    double sigma = 0.75;
    double r = 0.05;
    double T = 1.0 / 12.0;

    // Price basic calls and put @ strike of 95.00 using Black-Scholes
    std::cout << "Black-Scholes:\n";
    std::cout << "Call Price: " << black_scholes.price_contract(S, X, sigma, r, T, "CALL") << "\n";
    std::cout << "Put Price: " << black_scholes.price_contract(S, X, sigma, r, T, "PUT") << "\n\n";

    // Extra test parameter (steps) for Binomial
    double N = 100.0;

    // Placeholders for Binomial
    std::cout << "Binomial:\n";
    std::cout << "Call Price: " << binomial.price_contract(S, X, sigma, r, T, N, "CALL") << "\n";
    std::cout << "Put Price: " << binomial.price_contract(S, X, sigma, r, T, N, "PUT") << "\n";
    
    std::cout << "\n";
    return 0;
}
