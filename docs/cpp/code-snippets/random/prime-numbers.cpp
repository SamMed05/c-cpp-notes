#include <iostream>
#include <cstdlib>
#include <ctime>
#define min 10
#define max 100
using namespace std;

int main() {
    srand(time(NULL));

    int num, count = 0;

    for (int i = 1; i <= 10; i++) {
        num = rand() % (max - min + 1) + min;

        cout << i << " Number generated: " << num << endl;

        int countDividers = 0;

        for (int j = 1; j <= num; j++)
            if (num % j == 0)
                countDividers++;
        
        if (countDividers == 2)
            count++;
    }

    cout << count << " prime numbers have been generated." << endl;

    return 0;
}
