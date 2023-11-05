#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 10
#define max 50
using namespace std;

int main() {
    srand(time(NULL));

    int num = rand() % (max - min + 1) + min;
    cout << "Generated number: " << num << endl;

    for (int i = 1; i <= num; i++) { // you can't start from 0!
        if (num % i == 0) {
            cout << i << " is a divider of " << num << endl;
        }
    }

    return 0;
}
