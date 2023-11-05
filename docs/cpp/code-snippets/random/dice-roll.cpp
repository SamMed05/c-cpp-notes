#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 1
#define max 6
using namespace std;

int main() {
    srand(time(NULL));
    int x, count = 0, y;

    cout << "How many times do you want to roll the dice?" << endl;
    cin >> x;

    for (int i = 0; i < x; i++) {
        y = rand() % (max - min + 1) + min;

        cout << "The extracted number is: " << y << endl;

        if (y == 6)
            count++;
    }
    cout << "The number 6 came out " << count << " times." << endl;

    return 0;
}
