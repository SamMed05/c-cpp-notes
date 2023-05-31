#include <iostream>
using namespace std;

int main() {
    int n, count = 0;
    
    cout << "Enter a number: ";
    cin >> n;
    
    // loop to check if n is prime
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) {
            count = count + 1;
        }
    }
    
    if (cont <= 2)
        cout << "The number is prime" << endl;
    else
        cout << "The number is not prime" << endl;
    
    return 0;
}