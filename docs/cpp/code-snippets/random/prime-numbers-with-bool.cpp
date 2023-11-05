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
        
        bool prime = true;
        
        for (int j = 2; j < num; j++)
            if (num % j == 0)
                prime = false;
        
        if (prime)
            count++;
    }

    cout << count << " prime numbers have been generated." << endl;

    return 0;
}
