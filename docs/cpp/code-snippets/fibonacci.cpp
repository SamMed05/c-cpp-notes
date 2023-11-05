#include <iostream>
using namespace std;

int main() {
    int n;
    
    cout << "Enter the number of terms for the Fibonacci sequence: ";
    cin >> n;
    
    int num1 = 0, num2 = 1, sum = 0;
    
    for (int i = 1; i <= n; i++) {
        if (i == 1) {
            cout << num1<< endl;
            continue;
        }
        if (i == 2) {
            cout << num2 << endl;
            continue;
        }
        
        sum = num1 + num2;
        num1 = num2;
        num2 = sum;
        
        cout << sum << endl;
    }

    return 0;
}
