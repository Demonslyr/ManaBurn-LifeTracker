using System;

namespace ManaBurnServer.Models
{
    public class PlayerState
    {
        public int PlayerHealth { get; set; }
        public string PlayerName { get; set; }
        public string PlayerId { get; set; }
        public CommanderDamage[] PlayerCommanderDamage { get; set; }
        public Emblem[] Emblems { get; set; }
        public Counter[] Counters { get; set; }
        public bool IsTurn { get; set; }
        public Trigger[] Triggers { get; set; }
    }
}
