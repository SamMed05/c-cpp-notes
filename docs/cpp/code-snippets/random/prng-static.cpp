#include <iostream>
#include <cstdlib>
#define min 1
#define max 10
using namespace std;

int main() {
    int n;

    for (int i = 1; i <= 5; i++) {
        n = rand() % (max - min + 1) + min;
        cout << "Number " << i << " generated: " << n << endl;
    }

    return 0;
}
