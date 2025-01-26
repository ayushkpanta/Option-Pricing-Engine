
#ifndef UTILS_H
#define UTILS_H

#include <cmath>

// Trying Doxygen :) 
/**
 * @brief Computes the cumulative distribution function (CDF) for a Gaussian distribution.
 * 
 * This function calculates the probability that a random variable from a Gaussian distribution with a given mean and standard deviation is less than or equal to the passed value 'x'.
 * 
 * @param x The value at which the CDF is evaluated.
 * @param mean The mean of the Gaussian distribution
 * @param std The standard deviation of the Gaussian distribution. This value must be greater than 0.
 * @return The cumulative probability P(X <= x) for the Gaussian distribution
 */
double normCDF(double x, double mean = 0, double std = 1);

double round_double(double x, double precision = 100.0);

void display_matrix(std::vector<std::vector<double> > matrix);

#endif 
