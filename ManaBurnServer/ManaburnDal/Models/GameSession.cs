using System;

namespace ManaburnDal.Models
{
    public class GameSession
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int StartingLifeTotal { get; set; }
        public int MaxPlayers { get; set; }
        public bool AllowSpectators { get; set; }
        public string ShortUrlKey { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedUTC { get; set; }
        public DateTime ExpirationUTC { get; set; }
        public string Status { get; set; }
    }
}
