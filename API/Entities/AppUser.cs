using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;

namespace API.Entities
{
    //Logical name of a class
    public class AppUser
    {
        public int Id { get; set; }
        public required string UserName { get; set; }
        //String in.Net is concidered as reference type and int is concidered as primitive type
        //Default value of primitive type is 0 while as for reference type is null when nullable is accetable

        // public required byte[] PasswordHash { get; set; }
        // public required byte[] PasswordSalt { get; set; }
        public byte[] PasswordHash { get; set; } = [];
        public byte[] PasswordSalt { get; set; } = [];

        public DateOnly DateOfBirth { get; set; }
        public required string KnownAs { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastEntry { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public required string Gender { get; set; }
        public string? Introduction { get; set; }
        public string? Intrests { get; set; }
        public string? LookingFor { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public List<Photo> Photos { get; set; } = [];

        // public int GetAge() 
        // {
        //     return DateOfBirth.CalculateAge();
        // }
        
    }
}