using System.ComponentModel.DataAnnotations;

namespace ManaburnDal.Models
{
    public class FeedbackSubmission
    {
        [Required]
        [MaxLength(1000)]
        public string Message { get; set; }
    }
}
