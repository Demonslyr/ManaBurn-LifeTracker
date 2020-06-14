using System;

namespace ManaburnDal.Models
{
    public class Feedback
    {
        public string Id { get; set; }
        public string Message { get; set; }
        public string Source { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedUTC { get; set; }
        public char Status { get; set; }
    }
}
