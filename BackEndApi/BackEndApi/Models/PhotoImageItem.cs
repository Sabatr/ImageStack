using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace BackEndApi.Models
{
    public class PhotoImageItem
    {
        [Required(ErrorMessage = "Title is required.")]
        public string PhotoTitle { get; set; }
        public string PhotoDescription { get; set; }
        [Required(ErrorMessage = "Image is required")]
        public IFormFile Image { get; set; }
    }
}
