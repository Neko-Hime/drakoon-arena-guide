const Vec3 = require('tera-vec3');

const {
    EVENT_MESSAGE_TYPE,
    DEFAULT_TEXT_COLOR,
    TEXT_COLORS,
    DUNGEONS
} = require('./config');

module.exports = function DungeonsGuide(mod) {
    let bossInfo = null;
    let bossCurrentPos = null;
    let UID = 999999999;

    mod.hook('S_BOSS_GAGE_INFO', 3, event => {
        let bossHP = (Number(event.curHp) / Number(event.maxHp));
        bossInfo = event;
        if (bossHP <= 0 || bossHP == 1) {
            bossInfo = null;
        }
    });

    mod.hook('S_ACTION_STAGE', 9, event => {
        if (!bossInfo || bossInfo.templateId != event.templateId || event.stage != 0) return;

        let skillID = event.skill.id % 1000;
        bossCurrentPos = {x: event.loc.x, y: event.loc.y, z: event.loc.z, w: event.w};

        DUNGEONS.forEach(dungeon => {
            if (dungeon.zoneID.includes(bossInfo.huntingZoneId)) {
                let bossSkillID = dungeon.bosses[bossInfo.templateId].find(obj => obj.id == skillID);
                if (bossSkillID) {
                    showMessage(bossSkillID.msg, bossSkillID.timeout);
                    spawnsItems(bossSkillID.spawns);
                }
            }
        });
    });

    function showMessage (msg, timeout) {
        if (!msg) return;

        if (Number(timeout) == 0) {
            sendMessage(EVENT_MESSAGE_TYPE, prepareMessage(msg));
        } else if (Number(timeout) > 0) {
            mod.setTimeout(() => {
                sendMessage(EVENT_MESSAGE_TYPE, prepareMessage(msg));
            }, timeout);
        }
    }

    function prepareMessage (msg) {
        msg = msg.replace(/\[color="(\w+)"]/g, function(match, color){
            return `<font color="#${getRGBColor(color)}">`;
        });
        msg = msg.replace(/\[\/color]/g, '</font>');
        return `<font size="24" color="#${DEFAULT_TEXT_COLOR}">${msg}</font>`;
    }

    function sendMessage (type, msg) {
        mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
            type: type,
            chat: false,
            channel: 0,
            message: msg
        });
    }

    function getRGBColor (color) {
        switch (color) {
            case 'red':
                return TEXT_COLORS.red;
            case 'green':
                return TEXT_COLORS.green;
            case 'blue':
                return TEXT_COLORS.blue;
            case 'purple':
                return TEXT_COLORS.purple;
            default:
                return DEFAULT_TEXT_COLOR;
        }
    }

    function spawnsItems (spawns) {
        spawns.forEach(item => {
            let point = getPoint(item.pointDegrees, item.pointRadius);
            switch (item.type) {
                case 'item':
                    spawnItemWithTimeout(point, item.item, item.time, item.degrees, item.radius, item.timeout);
                    break;
                case 'line':
                    spawnLine(point, item.item, item.time, item.degrees, item.intervalRadius, item.maxRadius, item.timeout);
                    break;
                case 'circle':
                    spawnCircle(point, item.item, item.time, item.intervalDegrees, item.radius, item.timeout);
                    break;
            }
        });
    }

    function spawnLine (point, item, time, degrees, intervalRadius, maxRadius, timeout) {
        for (let radius = intervalRadius; radius <= maxRadius; radius += intervalRadius) {
            spawnItemWithTimeout(point, item, time, degrees, radius, timeout);
        }
    }

    function spawnCircle (point, item, time, intervalDegrees, radius, timeout) {
        for (let degrees = 0; degrees < 360; degrees += intervalDegrees) {
            spawnItemWithTimeout(point, item, time, degrees, radius, timeout);
        }
    }

    function getPoint (degrees, radius) {
        if (bossCurrentPos && Number(degrees) > 0 && Number(radius) > 0) {
            let finalrad = (bossCurrentPos.w - Math.PI) - (degrees * Math.PI / 180);
            let spawnx = bossCurrentPos.x + radius * Math.cos(finalrad);
            let spawny = bossCurrentPos.y + radius * Math.sin(finalrad);
            return {x: spawnx, y: spawny, z: bossCurrentPos.z, w: bossCurrentPos.w};
        }
        else {
            return bossCurrentPos;
        }
    }

    function spawnItemWithTimeout (point, item, time, degrees, radius, timeout) {
        if (!point) return;

        if (Number(timeout) == 0) {
            spawnItem(point, item, time, degrees, radius);
        } else if (Number(timeout) > 0) {S
            mod.setTimeout(() => {
                spawnItem(point, item, time, degrees, radius);
            }, timeout);
        }
    }

    function spawnItem (point, item, time, degrees, radius) {
        let finalrad = (point.w - Math.PI) - (degrees * Math.PI / 180);
        let spawnx = point.x + radius * Math.cos(finalrad);
        let spawny = point.y + radius * Math.sin(finalrad);
        mod.send('S_SPAWN_COLLECTION', 4, {
            gameId : UID,
            id : item,
            amount : 1,
            loc : new Vec3(spawnx, spawny, point.z),
            w : point.w - Math.PI
        });
        setTimeout(Despawn, time, UID);
        UID--;
    }

    function Despawn (UID_ARG) {
        mod.send('S_DESPAWN_COLLECTION', 2, {
            gameId : UID_ARG
        });
    }
};
