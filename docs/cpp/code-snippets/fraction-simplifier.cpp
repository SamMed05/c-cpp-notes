#include <iostream>
using namespace std;

int main() {
    int n, d;

    cout << "Enter the numerator: " << endl;
    cin >> n;

    do {
        cout << "Enter the denominator: " << endl;
        cin >> d;
        if (d == 0)
            cout  << "The denominator of a fraction can't be null. Try again" << endl;
    } while (d == 0);

    cout << "Fraction entered: " << n << " / " << d << endl;

    bool r = false;
    int min;

    if (d < n)
        min = d;
    else
        min = n;
    
    for (int i = min; i >= 2; i--) {
        if (n % i == 0 && d % i == 0) {
            r = true;
            n /= i;
            d /= i;
        }
    }

    if (d == 1)
        cout << "Apparent fraction of value: " << n << endl;
    else
        cout << "Simplified fraction: " << n << " / " << d << endl;

    if (r)
        cout << "Fraction simplified" << endl;
    else
        cout << "The fraction is not simplifiable" << endl;

    return 0;
}