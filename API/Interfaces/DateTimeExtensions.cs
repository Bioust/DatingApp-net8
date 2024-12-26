using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateOnly dob)   //this is used to extend the class
        {
            var today = DateOnly.FromDateTime(DateTime.Now);
            var age = today.Year - dob.Year;

            if(dob > today.AddYears(-age)) age--;

            return age;
        }
        
    }
}