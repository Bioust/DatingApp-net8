using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimsPrincipalsExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {

            var userNmae = user.FindFirstValue(ClaimTypes.Name)
            ?? throw new Exception("No UserName Found in the token");       //Nul Collace
            return userNmae;
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {

            var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("No UserName Found in the token"));       //Nul Collace
            return userId;
        }
    }
}