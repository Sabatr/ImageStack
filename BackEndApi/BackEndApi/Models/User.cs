using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndApi.Models
{
    public class User
    {
        [Key]
        [Required(ErrorMessage = "User Name is required.")]
        [StringLength(20, MinimumLength = 3,
        ErrorMessage = "Name Should be minimum 3 characters and a maximum of 20 characters")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [StringLength(20, MinimumLength = 3,
        ErrorMessage = "Name Should be minimum 3 characters and a maximum of 20 characters")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [ForeignKey("UserRefId")]
        public ICollection<Photo> Photos { get; set; }
    }
}
