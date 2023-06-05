#include <iostream>
using namespace std;

int main() {
    int num;
    int sum = 0;

    do {
        cout << "Enter a number: " << endl;
        cin >> num;
    } while (num < 1 || num > 10);

    for (int i = num; i <= num + 10; i++) {
        sum += i;

        cout << "Iteration " << i - sum + 1 << endl;
        cout << "Sum: " << sum << endl;

        if (sum > 50)
            break;
    }
}