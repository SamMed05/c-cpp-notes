#include <iostream>
using namespace std;

int main () {
    int input, sum = 0;
    
    do {
        cout << "Enter a number" << endl;
        cin >> input;
        
        sum += input;
    } while (input != 0);
    
    cout << "Sum: " << sum << endl;
    
    return 0;
}