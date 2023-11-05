#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 5
#define max 30
using namespace std;

int main() {
    srand(time(NULL));

    int n, sum = 0, count = 0, i;
    float average;

    for (i = 0; i < 20; i++) {
        n = rand() % (max - min + 1) + min;
        cout << " Generated number: " << n << endl;

        if (n > 20)
            count++;

        sum += n;
    }

    average = (float)sum / i;
    cout << "\nAverage: " << average << endl;
	cout << "There are "<< count << " numbers greater than 20" << endl;

    return 0;
}
