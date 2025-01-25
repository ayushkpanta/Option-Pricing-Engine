
#include <iostream>
#include "models.h"
#include <vector>
#include <tuple>
#include <string>

BinomialModel::BinomialModel() {
    std::cout << "Initialized Binomial Model.\n";
}

// DOES NOT MATCH MY PYTHON IMPLEMENTATION
// NEED TO DEBUG

double BinomialModel::price_contract(double S, double X, double sigma, double r, double T, double N, std::string type) {

    // Get timesep and discount rate
    double dt = T / N;
    double discount_rate = std::exp(-r * dt);

    // Calculate up/down factors and risk-neutral probabilities
    double u = std::exp(sigma * std::sqrt(dt));
    double d = 1.0 / u;
    double p_u = (std::exp(r * dt) - d) / (u - d);
    double p_d = 1 - p_u;

    // Get N as size for idiomatic iterating and vector sizing
    size_t N_spec = static_cast<size_t>(N);

    // Creating 'decay' vector
    std::vector<double> decay_vec(N_spec+1, 0.0);
    for (size_t i = 1; i < N_spec; i++) {
        int decay_factor = N_spec + 1 - i;
        decay_vec[i] = std::pow(d, decay_factor);
    }

    // Creating 'growth' vector
    std::vector<double> growth_vec(N_spec+1, 0.0);
    for (size_t i = 0; i < N_spec+1; i++) {
        int growth_factor = i;
        growth_vec[i] = std::pow(u, growth_factor);
    }

    // Shrinking vectors for efficiency
    decay_vec.shrink_to_fit();
    growth_vec.shrink_to_fit();

    // Getting contract valuation vector
    std::vector<double> contract_value(decay_vec.size(), 0.0);
    for (int i = 0; i < decay_vec.size(); i++) {
        double base_value = S * decay_vec[i] * growth_vec[i];

        // Spot - Strike if CALL, flip if PUT
        if (type == "CALL") {
            contract_value[i] = std::max(base_value - X, 0.0);
        } else if (type == "PUT") {
            contract_value[i] = std::max(X - base_value, 0.0);
        }
    }

    // Backwards induction
    for (size_t i = N_spec - 1; i >= 1; i--) {
        for (size_t j = 0; j < i; j++) {
            contract_value[j] = discount_rate * (p_u * contract_value[j+1] + p_d * contract_value[j]);
        }
    }

    return contract_value[0];
}
