#include <iostream>
using namespace std;

int main() {
    int num;
    int count = 0, max = 0, sum = 0;

    while (count < 10) {
        cout << "Enter a non-negative number: " << endl;

        do {
            cin >> num;
        } while (num < 0);

        if (num > max) {
            max = num;
        }

        sum += num;
        count += 1;
    }

    cout << "The maximum number is: " << max << endl;

    return 0;
}