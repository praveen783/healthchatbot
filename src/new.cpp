class Solution
{
public:
    int longestSubarray(vector<int> &arr, int k)
    {
        // code here
        sort(arr.begin(), arr.end());
        int maxi = INT_MIN, sum = 0, count = 0;
        double avg = 0;
        for (int i = 0; i < n; i++)
        {
            sum += arr[i];
            count++;
            avg = (double)sum / (double)count;
            if (avg > k)
            {
                sum = 0;
                count = 0;
            }
            else
            {
                if (count > maxi)
                {
                    maxi = count;
                }
            }
        }
        return maxi;
    }
};