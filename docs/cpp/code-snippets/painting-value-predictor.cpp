#include <iostream>
#include <iomanip> // for setprecision()
using namespace std;

int main() {
    float value;
    int years;

    do {
        cout << "How much did you pay the painting?" << endl;
        cin >> value;
    } while (value <= 0);

    do {
        cout << "In how many years will you be reselling the painting?" << endl;
        cin >> years;
    } while (years <= 0);
    
    for (int i = 1; i <= years; i++) {
        value *= 1.05;
        cout << "The painting in " << i << " years will be worth $" << setprecision(2) << value << endl;
    }

    return 0;
}