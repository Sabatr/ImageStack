using System.ComponentModel.DataAnnotations;

namespace BackEndApi.Models
{
    public class Photo
    {
        [Required]
        public int PhotoId { get; set; }
        [Required(ErrorMessage = "Title is required.")]
        public string PhotoTitle { get; set; }
        public string PhotoDescription { get; set; }
        [Required(ErrorMessage = "Url is required.")]
        public string PhotoUrl { get; set; }
        [Required(ErrorMessage = "Error: Cannot retrieve data. Please try again.")]
        public string DateMade { get; set; }

        public string UserRefId { get; set; }
    }
}