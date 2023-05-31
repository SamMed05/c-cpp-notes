#include <iostream>
using namespace std;

int main() {
    int n;
    bool isPrime = true;
    
    cout << "Enter a number: ";
    cin >> n;
    
    // 0 and 1 are not prime numbers
    if (n == 0 || n == 1) {
        isPrime = false;
    }

    // loop to check if n is prime
    for (int i = 2; i <= n/2; i++) { // there are no integer factors for n beyond n/2
        if (n % i == 0) {
            isPrime = false;
            break;
        }
    }
    
    if (isPrime) {
        cout << "The number is not prime" << endl;
    } else {
        cout << "The number is prime" << endl;
    }
    
    return 0;
}