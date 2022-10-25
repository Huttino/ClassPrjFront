import { TestBed } from '@angular/core/testing';

import { VideoLessonService } from './video-lesson.service';

describe('VideoLessonService', () => {
  let service: VideoLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
