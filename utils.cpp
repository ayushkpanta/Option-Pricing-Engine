
#include <iostream>
#include <cmath>
#include "utils.h"

// Computing CDF of Gaussian @ a value x -> P(X <= x)
double normCDF(double x, double mean, double std) {
    double z_score = (x - mean) / std;
    return 0.5 * std::erfc(-z_score / std::sqrt(2));
}
