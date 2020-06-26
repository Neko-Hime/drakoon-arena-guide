module.exports = {
    EVENT_MESSAGE_TYPE: 40,
    DEFAULT_TEXT_COLOR: 'FFFF00',
    TEXT_COLORS: {
        red: 'FF0000',
        green: '008000',
        blue: '0000FF',
        purple: '800080'
    },
    DUNGEONS: [
        {zoneName: 'DA', zoneID: [3102], bosses: {
                1000: [
                    {id: 101, msg: 'Double Slash', spawns: [], timeout: 0},
                    {id: 103, msg: 'Double Slash into Cross Slash', spawns: [], timeout: 0},
                    {id: 104, msg: 'Double Upslash', spawns: [], timeout: 0},
                    {id: 105, msg: 'Uppercut into Stun ([color="red"]stun inc[/color]) [B,I]', spawns: [], timeout: 0},
                    {id: 107, msg: 'Spectral Throw ([color="purple"]bleed[/color])', spawns: [], timeout: 0},
                    {id: 109, msg: 'Stomp into Spin ([color="red"]kd[/color]+[color="purple"]bleed[/color]) [B,I]', spawns: [], timeout: 0},
                    {id: 110, msg: 'Quantum Wave', spawns: [], timeout: 0},
                    {id: 111, msg: 'Leap ([color="red"]stun[/color]) [I]', spawns: [], timeout: 0},
                    {id: 112, msg: 'Kick into Backwave ([color="red"]push-back[/color]) [B,I]', spawns: [], timeout: 0},
                    {id: 113, msg: 'Double Upslash into Spin', spawns: [], timeout: 0},
                    {id: 115, msg: 'AoE Bombs', spawns: [], timeout: 0},
                    {id: 118, msg: 'Double Upslash into Front Stab', spawns: [], timeout: 0},
                    {id: 120, msg: 'Traverse Cut ([color="red"]stun[/color]) [B,I]', spawns: [], timeout: 0},
                    {id: 121, msg: 'Purple Magic ([color="red"]Right Foot[/color], Inner donut first)', spawns: [], timeout: 0},
                    {id: 124, msg: 'Purple Magic ([color="red"]Left Foot[/color], Outer donut first)', spawns: [], timeout: 0},
                    {id: 302, msg: 'Righteous Fire', spawns: [], timeout: 0},
                    {id: 304, msg: 'Shield ([color="purple"]plague[/color]/[color="blue"]regression[/color])', spawns: [], timeout: 0},
                ],
        }}
    ]
};
