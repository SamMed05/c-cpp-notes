#include <iostream>
using namespace std;

int main() {
    int n;
    int min;
    int max;
    int value;
    int count = 0;

    cout << "How many numbers do you want to enter?";
    cin >> n;
    cout << "Enter the minimum range limit: ";
    cin >> min;
    cout << "Enter the maximum range limit: ";
    cin >> max;

    for (int i = 1; i <= n; i++) {
        cout << "Enter a value: " << endl;
        cin >> value;
        
        if (value >= min and value <= max) {
            count += 1;
        }
    }

    cout << "You entered " << count << " values included in the interval" << endl;

    return 0;       
}