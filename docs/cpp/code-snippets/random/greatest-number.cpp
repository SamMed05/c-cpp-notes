#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 5
#define max 30
using namespace std;

int main() {
    srand(time(NULL));

    int num, maximum = 5;

    for (int i = 0; i < 10; i++) {
        num = rand() % (max - min + 1) + min;

        cout << "Number " << i + 1 << " generated: " << num << endl;

        if (num >= maximum)
            maximum = num;
    }

    cout << "The maximum number generated is: " << maximum << endl;

    return 0;
}
