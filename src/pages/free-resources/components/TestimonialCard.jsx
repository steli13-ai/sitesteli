import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-card rounded-xl p-6 warm-shadow">
      <div className="flex items-start space-x-4">
        <Image
          src={testimonial?.avatar}
          alt={testimonial?.avatarAlt}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-body font-semibold text-text-primary">
                {testimonial?.name}
              </h4>
              <p className="text-sm text-text-secondary">
                {testimonial?.role} • Clasa {testimonial?.grade}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < testimonial?.rating ? 'text-warning fill-current' : 'text-muted'}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {testimonial?.content}
          </p>
          <div className="mt-3 text-xs text-text-secondary">
            {new Date(testimonial.date)?.toLocaleDateString('ro-RO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;