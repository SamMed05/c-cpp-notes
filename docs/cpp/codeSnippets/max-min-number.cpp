#include <iostream>
using namespace std;

int main() {
    int n;
    int input;
    int max = INT_MIN; // minimum possible number for signed int type in C++ (-2^31)
    int min = INT_MAX; // minimum possible number for signed int type in C++ (2^31 - 1)
    
    cout << "How many numbers do you want to enter?" << endl;
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        cout << "Enter a number: " << endl;
        cin >> input;
        
        if (input >= max)
            max = input;
        else if (input <= min)
            min = input;
    }
    
    cout << "The maximum number is: " << max << endl;
    cout << "The minimum number is: " << min << endl;
    
    return 0;
}