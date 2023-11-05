#include <iostream>
#include <cstdlib>
#include <ctime>
#include <cmath>
#define min 1
#define max 10
using namespace std;

int main() {
    srand(time(NULL));

    int a = rand() % (max - min + 1) + min;
    int b = rand() % (max - min + 1) + min;
    int c = rand() % (max - min + 1) + min;

    int sum = a + b + c;

    cout << "Generated numbers:" << endl << a << endl << b << endl << c << endl;
    cout << "\nSum: " << sum << endl;
    
    float r = sqrt(sum);
    int rad = r;

    if (r == rad)
        cout << "Perfect square." << endl;
    else
        cout << "Not a perfect square." << endl;

    return 0;
}
