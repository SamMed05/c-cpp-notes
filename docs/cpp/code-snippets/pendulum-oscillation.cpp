#include <iostream>
#include <cmath>
#define PI 3.1416
#define G 9.81

using namespace std;

int main() {
    float l;

    do {
        cout << "What is the length of the pendulum in cm? " << endl;
        cin >> l;
        if (l <= 0)
            cout << "Invalid length. Try again" << endl;
    } while (l <= 0);

    l /= 100;
    float p = 2 * PI * sqrt(l / G);

    cout << "The pendulum has a period equal to " << p << " seconds" << endl;

    return 0;
}