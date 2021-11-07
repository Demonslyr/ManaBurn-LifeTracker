using System;

namespace ManaBurnServer.Models
{
    public enum TriggerType
    {
        UPKEEP = 0,
        END_STEP = 1,
        BEGINNING_OF_COMBAT = 2,
        PRE_COMBAT_MAIN_PHASE = 3
    }
}