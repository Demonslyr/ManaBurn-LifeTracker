using System.ComponentModel.DataAnnotations;

namespace ManaburnDal.Models
{
    // TODO: May not need this
    public class FeedbackRequest
    {
        [Required]
        public int PageSize { get; set; }
        [Required]
        public int PageNumber { get; set; }
    }
}
