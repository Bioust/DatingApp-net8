using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    //Logical name of a class
    public class AppUser
    {
        public int Id { get; set; }
        public required string UserName { get; set; }
        //String in.Net is concidered as reference type and int is concidered as primitive type
        //Default value of primitive type is 0 while as for reference type is null when nullable is accetable

        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
        
    }
}