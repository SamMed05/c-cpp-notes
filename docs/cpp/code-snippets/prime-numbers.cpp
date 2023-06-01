#include <iostream>
using namespace std;

int main() {
    int n;
    bool isPrime = true;
    
    cout << "Enter a number: ";
    cin >> n;
    
    // loop to check if n is prime
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            isPrime = false;
        }
    }
    
    if (isPrime == false) {
        cout << "The number is not prime" << endl;
    } else {
        cout << "The number is prime" << endl;
    }
    
    return 0;
}