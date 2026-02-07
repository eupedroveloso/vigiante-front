import { Injectable } from '@angular/core';

export interface Icon {
  name: string;
  path: string;
  category: 'shapes' | 'arrows' | 'ui' | 'actions' | 'other';
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private icons: Icon[] = [
    // Shapes
    { name: 'Circle', path: '/assets/icons/circle.svg', category: 'shapes', tags: ['circle', 'round', 'shape', 'geometric'] },
    { name: 'Draw Circle', path: '/assets/icons/draw-circle.svg', category: 'shapes', tags: ['draw', 'circle', 'shape', 'geometric'] },
    { name: 'Draw Polygon', path: '/assets/icons/draw-polygon.svg', category: 'shapes', tags: ['draw', 'polygon', 'shape', 'geometric'] },
    { name: 'Draw Square', path: '/assets/icons/draw-square.svg', category: 'shapes', tags: ['draw', 'square', 'shape', 'geometric'] },
    { name: 'Hexagon Check', path: '/assets/icons/hexagon-check.svg', category: 'shapes', tags: ['hexagon', 'check', 'shape', 'geometric'] },
    { name: 'Bullseye', path: '/assets/icons/bullseye.svg', category: 'shapes', tags: ['bullseye', 'target', 'circle', 'shape'] },
    
    // Arrows
    { name: 'Arrow Down To Bracket', path: '/assets/icons/arrow-down-to-bracket.svg', category: 'arrows', tags: ['arrow', 'down', 'bracket', 'download'] },
    { name: 'Arrow Up From Bracket', path: '/assets/icons/arrow-up-from-bracket.svg', category: 'arrows', tags: ['arrow', 'up', 'bracket', 'upload'] },
    { name: 'Arrow Up From Square', path: '/assets/icons/arrow-up-from-square.svg', category: 'arrows', tags: ['arrow', 'up', 'square', 'external'] },
    { name: 'Chevron Down', path: '/assets/icons/chevron-down.svg', category: 'arrows', tags: ['chevron', 'down', 'dropdown', 'expand'] },
    { name: 'Chevron Left', path: '/assets/icons/chevron-left.svg', category: 'arrows', tags: ['chevron', 'left', 'back', 'previous'] },
    { name: 'Chevron Right', path: '/assets/icons/chevron-right.svg', category: 'arrows', tags: ['chevron', 'right', 'next', 'forward'] },
    { name: 'Chevron Up', path: '/assets/icons/chevron-up.svg', category: 'arrows', tags: ['chevron', 'up', 'collapse'] },
    
    // UI Elements
    { name: 'Align Left', path: '/assets/icons/align-left-1.svg', category: 'ui', tags: ['align', 'left', 'text', 'alignment'] },
    { name: 'Align Left Alt', path: '/assets/icons/align-left.svg', category: 'ui', tags: ['align', 'left', 'text', 'alignment'] },
    { name: 'Bars', path: '/assets/icons/bars.svg', category: 'ui', tags: ['bars', 'menu', 'hamburger', 'navigation'] },
    { name: 'Border Inner', path: '/assets/icons/border-inner.svg', category: 'ui', tags: ['border', 'inner', 'layout'] },
    { name: 'Ellipsis', path: '/assets/icons/ellipsis.svg', category: 'ui', tags: ['ellipsis', 'more', 'menu', 'options'] },
    { name: 'Ellipsis Vertical', path: '/assets/icons/ellipsis-vertical.svg', category: 'ui', tags: ['ellipsis', 'vertical', 'more', 'menu'] },
    { name: 'Expand', path: '/assets/icons/expand.svg', category: 'ui', tags: ['expand', 'fullscreen', 'maximize'] },
    { name: 'Filter', path: '/assets/icons/filter.svg', category: 'ui', tags: ['filter', 'search', 'sort'] },
    { name: 'Grip Dots', path: '/assets/icons/grip-dots.svg', category: 'ui', tags: ['grip', 'dots', 'drag', 'handle'] },
    { name: 'Grip Dots Vertical', path: '/assets/icons/grip-dots-vertical.svg', category: 'ui', tags: ['grip', 'dots', 'vertical', 'drag'] },
    { name: 'Grip Lines', path: '/assets/icons/grip-lines.svg', category: 'ui', tags: ['grip', 'lines', 'drag', 'handle'] },
    { name: 'List', path: '/assets/icons/list.svg', category: 'ui', tags: ['list', 'items', 'view'] },
    { name: 'List Check', path: '/assets/icons/list-check.svg', category: 'ui', tags: ['list', 'check', 'todo', 'items'] },
    { name: 'List Collection', path: '/assets/icons/List-collection.svg', category: 'ui', tags: ['list', 'collection', 'items'] },
    { name: 'List Radio', path: '/assets/icons/list-radio.svg', category: 'ui', tags: ['list', 'radio', 'items'] },
    { name: 'List Timeline', path: '/assets/icons/list-timeline.svg', category: 'ui', tags: ['list', 'timeline', 'items'] },
    { name: 'List Tree', path: '/assets/icons/list-tree.svg', category: 'ui', tags: ['list', 'tree', 'hierarchy'] },
    { name: 'Sliders', path: '/assets/icons/sliders.svg', category: 'ui', tags: ['sliders', 'controls', 'settings'] },
    
    // Actions
    { name: 'Check', path: '/assets/icons/check.svg', category: 'actions', tags: ['check', 'done', 'success', 'confirm'] },
    { name: 'Copy', path: '/assets/icons/copy.svg', category: 'actions', tags: ['copy', 'duplicate', 'clone'] },
    { name: 'Eye', path: '/assets/icons/eye.svg', category: 'actions', tags: ['eye', 'view', 'show', 'visible'] },
    { name: 'Eye Slash', path: '/assets/icons/eye-slash.svg', category: 'actions', tags: ['eye', 'slash', 'hide', 'invisible'] },
    { name: 'File Import', path: '/assets/icons/file-import.svg', category: 'actions', tags: ['file', 'import', 'upload'] },
    { name: 'Floppy Disk', path: '/assets/icons/floppy-disk.svg', category: 'actions', tags: ['save', 'floppy', 'disk', 'storage'] },
    { name: 'Gear', path: '/assets/icons/gear.svg', category: 'actions', tags: ['gear', 'settings', 'config', 'preferences'] },
    { name: 'Magnifying Glass', path: '/assets/icons/magnifying-glass.svg', category: 'actions', tags: ['search', 'magnify', 'find', 'lookup'] },
    { name: 'Magnifying Glass Location', path: '/assets/icons/magnifying-glass-location.svg', category: 'actions', tags: ['search', 'location', 'find', 'map'] },
    { name: 'Minus', path: '/assets/icons/minus.svg', category: 'actions', tags: ['minus', 'remove', 'subtract', 'delete'] },
    { name: 'Pen Line', path: '/assets/icons/pen-line.svg', category: 'actions', tags: ['pen', 'edit', 'write', 'draw'] },
    { name: 'Plus', path: '/assets/icons/plus.svg', category: 'actions', tags: ['plus', 'add', 'create', 'new'] },
    { name: 'Rotate Right', path: '/assets/icons/rotate-right.svg', category: 'actions', tags: ['rotate', 'right', 'turn', 'spin'] },
    { name: 'Share Nodes', path: '/assets/icons/share-nodes.svg', category: 'actions', tags: ['share', 'nodes', 'network', 'connect'] },
    { name: 'Trash', path: '/assets/icons/trash.svg', category: 'actions', tags: ['trash', 'delete', 'remove', 'bin'] },
    { name: 'Xmark', path: '/assets/icons/xmark.svg', category: 'actions', tags: ['x', 'close', 'cancel', 'remove'] },
    
    // Other
    { name: 'Bell', path: '/assets/icons/bell.svg', category: 'other', tags: ['bell', 'notification', 'alert', 'ring'] },
    { name: 'Bullhorn', path: '/assets/icons/bullhorn.svg', category: 'other', tags: ['bullhorn', 'announce', 'speaker', 'megaphone'] },
    { name: 'Calculator', path: '/assets/icons/calculator.svg', category: 'other', tags: ['calculator', 'math', 'compute'] },
    { name: 'Calendar', path: '/assets/icons/calendar.svg', category: 'other', tags: ['calendar', 'date', 'schedule'] },
    { name: 'Calendar Lines', path: '/assets/icons/calendar-lines.svg', category: 'other', tags: ['calendar', 'lines', 'date', 'schedule'] },
    { name: 'Calendar Week', path: '/assets/icons/calendar-week.svg', category: 'other', tags: ['calendar', 'week', 'date', 'schedule'] },
    { name: 'Car Side', path: '/assets/icons/car-side.svg', category: 'other', tags: ['car', 'vehicle', 'transport'] },
    { name: 'Circle Info', path: '/assets/icons/circle-info.svg', category: 'other', tags: ['circle', 'info', 'information', 'help'] },
    { name: 'Clipboard User', path: '/assets/icons/clipboard-user.svg', category: 'other', tags: ['clipboard', 'user', 'profile'] },
    { name: 'Clock', path: '/assets/icons/clock.svg', category: 'other', tags: ['clock', 'time', 'watch'] },
    { name: 'Clock 1', path: '/assets/icons/clock-1.svg', category: 'other', tags: ['clock', 'time', 'watch'] },
    { name: 'Crosshairs Simple', path: '/assets/icons/crosshairs-simple.svg', category: 'other', tags: ['crosshairs', 'target', 'aim', 'focus'] },
    { name: 'File', path: '/assets/icons/file.svg', category: 'other', tags: ['file', 'document'] },
    { name: 'File Circle Exclamation', path: '/assets/icons/file-circle-exclamation.svg', category: 'other', tags: ['file', 'circle', 'exclamation', 'error', 'warning'] },
    { name: 'File Circle Info', path: '/assets/icons/file-circle-info.svg', category: 'other', tags: ['file', 'circle', 'info', 'information'] },
    { name: 'Focus', path: '/assets/icons/focus.svg', category: 'other', tags: ['focus', 'target', 'aim'] },
    { name: 'Folder Open', path: '/assets/icons/folder-open.svg', category: 'other', tags: ['folder', 'open', 'directory'] },
    { name: 'Folder Tree', path: '/assets/icons/folder-tree.svg', category: 'other', tags: ['folder', 'tree', 'directory', 'hierarchy'] },
    { name: 'House', path: '/assets/icons/house.svg', category: 'other', tags: ['house', 'home', 'main'] },
    { name: 'Input Numeric', path: '/assets/icons/input-numeric.svg', category: 'other', tags: ['input', 'numeric', 'number'] },
    { name: 'Layer Group', path: '/assets/icons/layer-group.svg', category: 'other', tags: ['layer', 'group', 'stack'] },
    { name: 'Layer Minus', path: '/assets/icons/layer-minus.svg', category: 'other', tags: ['layer', 'minus', 'remove'] },
    { name: 'Layer Plus', path: '/assets/icons/layer-plus.svg', category: 'other', tags: ['layer', 'plus', 'add'] },
    { name: 'Location Crosshairs', path: '/assets/icons/location-crosshairs.svg', category: 'other', tags: ['location', 'crosshairs', 'gps', 'position'] },
    { name: 'Location Dot', path: '/assets/icons/location-dot.svg', category: 'other', tags: ['location', 'dot', 'pin', 'gps'] },
    { name: 'Location Plus', path: '/assets/icons/location-plus.svg', category: 'other', tags: ['location', 'plus', 'add', 'pin'] },
    { name: 'Lock Keyhole', path: '/assets/icons/lock-keyhole.svg', category: 'other', tags: ['lock', 'keyhole', 'secure', 'private'] },
    { name: 'Map', path: '/assets/icons/map.svg', category: 'other', tags: ['map', 'geography', 'location'] },
    { name: 'Map Pin', path: '/assets/icons/map-pin.svg', category: 'other', tags: ['map', 'pin', 'location', 'marker'] },
    { name: 'Palette', path: '/assets/icons/palette.svg', category: 'other', tags: ['palette', 'color', 'paint'] },
    { name: 'Palette 1', path: '/assets/icons/palette-1.svg', category: 'other', tags: ['palette', 'color', 'paint'] },
    { name: 'Pin Viewfinder', path: '/assets/icons/pin-viewfinder.svg', category: 'other', tags: ['pin', 'viewfinder', 'target', 'aim'] },
    { name: 'Play', path: '/assets/icons/play.svg', category: 'other', tags: ['play', 'start', 'media'] },
    { name: 'Ruler', path: '/assets/icons/ruler.svg', category: 'other', tags: ['ruler', 'measure', 'length'] },
    { name: 'Screen Users', path: '/assets/icons/screen-users.svg', category: 'other', tags: ['screen', 'users', 'monitor', 'display'] },
    { name: 'Sensor On', path: '/assets/icons/sensor-on.svg', category: 'other', tags: ['sensor', 'on', 'active', 'detect'] },
    { name: 'User', path: '/assets/icons/user.svg', category: 'other', tags: ['user', 'person', 'profile', 'account'] },
    { name: 'Users', path: '/assets/icons/users.svg', category: 'other', tags: ['users', 'people', 'group'] },
    { name: 'Users Rectangle', path: '/assets/icons/users-rectangle.svg', category: 'other', tags: ['users', 'rectangle', 'group', 'team'] },
  ];

  getAllIcons(): Icon[] {
    return this.icons;
  }

  getIconsByCategory(category: string): Icon[] {
    if (category === 'all') {
      return this.icons;
    }
    return this.icons.filter(icon => icon.category === category);
  }

  searchIcons(query: string): Icon[] {
    const lowerQuery = query.toLowerCase();
    return this.icons.filter(icon => 
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  addIcon(icon: Icon): void {
    this.icons.push(icon);
  }
}
