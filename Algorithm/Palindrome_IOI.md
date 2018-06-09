###1. Tìm số chữ cái ít nhất thêm vào chuỗi đề trở thành chuỗi đối xứng
```cpp
Palindrome - IOI 2000
    #include <iostream>
    #include <cstdio>
    #include <string>
    using namespace std;
    int n,m;
    char s1[500],s2[500];
    int matrix[500][500];
    int max(int x,int y)
    {
        if(x>y)
            return x;
        return y;
    }
    int LCS()
    {
        int i,j;
        for (i=0; i<=n; i++)
           {
             for (j=0; j<=n; j++)
             {
               if (i == 0 || j == 0)
                 matrix[i][j] = 0;

               else if (s1[i-1] == s2[j-1])
                 matrix[i][j] = matrix[i-1][j-1] + 1;

               else
                 matrix[i][j] = max(matrix[i-1][j], matrix[i][j-1]);
             }
           }
        return matrix[n][n];
    }
    string s;
    char ch[5004];
    int main()
    {
        int i, j, c;

        printf("Length of string: ");
        scanf("%d",&n);
        printf("Fill in string: ");
        scanf("%s",ch);

        for(i=1;i<=n;i++)
            s1[i]=ch[i-1];
        for(i=1;i<=n;i++)
            s2[i]=s1[n-i+1];

        c=LCS();

        for(int i = 0; i < n; i++) {
            for(int j = 0; j <= n; j++) {
                printf("%d ", matrix[i][j]);
            }
            printf("\n");
        }
        printf("Number a character should be added: %d",n-c);
        return 0;
    }
```