using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] //Annotations for validations
        public required string Username { get; set; }
        public required string Password { get; set; }
        
        public string? KnownAs { get; set; }
        
        public string? City { get; set; }
        
        public string? Country { get; set; }
        
        public string? Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }
        
    }
}