#include <iostream>
using namespace std;

int main() {
    int b, h;

    do {
        cout << "Enter the base: " << endl;
        cin >> b;
    } while (b < 1 || b > 10);

    do {
        cout << "Enter the height: " << endl;
        cin >> h;
    } while (h < 1 || h > 10);

    for (int i = 0; i < h; i++) {
        for (int j = 0; j < b; j++) {
            cout << "* ";
        }
        cout << endl;
    }

    return 0;
}