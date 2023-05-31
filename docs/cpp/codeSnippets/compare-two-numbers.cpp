#include <iostream>
using namespace std;

int main() {
    int n1, n2;

    cout << "enter the first number: ";
    cin >> n1;

    cout << "enter the second number: ";
    cin >> n2;

    if (n1 == n2) {
        cout << "both numbers are equal" << endl;
    } else if (n1 > n2) {
        cout << "the first number is bigger" << endl;
    } else {
        cout << "the second number is bigger" << endl;
    }

    return 0;
}