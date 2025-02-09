
#include <iostream>
#include <cmath>
#include "utils.h"
#include <vector>
#include <iomanip>

// Computing CDF of Gaussian @ a value x -> P(X <= x)
double normCDF(double x, double mean, double std)
{
    double z_score = (x - mean) / std;
    return 0.5 * std::erfc(-z_score / std::sqrt(2));
}

double round_double(double x, double precision)
{
    return std::round(x / precision) * precision;
}

void display_matrix(std::vector<std::vector<double>> matrix)
{

    std::cout << std::fixed << std::setprecision(2);

    for (const auto &row : matrix)
    {
        for (const auto &val : row)
        {
            std::cout << val << " ";
        }
        std::cout << "\n";
    }
}
