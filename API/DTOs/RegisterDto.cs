using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] //Annotations for validations
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}